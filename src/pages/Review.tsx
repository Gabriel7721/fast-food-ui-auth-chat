import { useEffect, useState } from "react";
import type { PopulatedMenuItem, PopulatedUser, Review } from "../data/types";
import fetchReview, { createReview, deleteReview } from "../api/review";
import Stars from "../components/Stars";
import { fetchMenu, fetchUsers, type IdName } from "../api/lookup";

function getUserName(u: Review["user"]) {
  if (u && typeof u === "object") {
    const pu = u as PopulatedUser;
    return pu.name ?? String(pu._id);
  }
  return String(u);
}

function getMenuItem(m: Review["item"]): string {
  if (m && typeof m === "object") {
    const pm = m as PopulatedMenuItem;
    return pm.name ?? String(pm._id);
  }
  return String(m);
}

type NewReview = {
  user: string;
  item: string;
  rating: number;
  comment: string;
};

export default function Review() {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<NewReview>({
    user: "",
    item: "",
    rating: 0,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);


  const [users, setUsers] = useState<IdName[]>([]);
  const [menus, setMenus] = useState<IdName[]>([]);
  const [loadingLookup, setLoadingLookup] = useState(true);
  const [lookupError, setLookupError] = useState<string | null>(null);


  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchReview(ctrl.signal)
      .then(setData)
      .catch((e) => {
        if (e?.name !== "AbortError") setError(e?.message ?? "Load failed");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

 
  useEffect(() => {
    const run = async () => {
      try {
        setLoadingLookup(true);
        setLookupError(null);
        const [u, m] = await Promise.all([fetchUsers(), fetchMenu()]);
        setUsers(u);
        setMenus(m);
      } catch (e: any) {
        setLookupError(e?.message ?? "Load lookup failed");
      } finally {
        setLoadingLookup(false);
      }
    };
    run();
  }, []);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.user || !form.item || form.rating < 1 || form.rating > 5) {
      alert("Nhập user, item (ObjectId) và rating (1..5)");
      return;
    }

    try {
      setSubmitting(true);
      const created = await createReview(form);

    
      const u = users.find((x) => x._id === form.user);
      const m = menus.find((x) => x._id === form.item);

      const createdWithNames: Review = {
        ...created,
        user:
          typeof created.user === "string"
            ? u
              ? { _id: created.user, name: u.name ?? u.email }
              : created.user
            : created.user,
        item:
          typeof created.item === "string"
            ? m
              ? { _id: created.item, name: m.name }
              : created.item
            : created.item,
      };

      setData((prev) => [createdWithNames, ...prev]);
      setForm({ user: "", item: "", rating: 0, comment: "" });
    } catch (err: any) {
      alert(err?.message ?? "Create failed");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Xoá review này?")) return;
    try {
      await deleteReview(id);
      setData((prev) => prev.filter((r) => r._id !== id));
    } catch (err: any) {
      alert(err?.message ?? "Delete failed");
    }
  };

  const userLabel = (u: IdName) => u.name ?? u.email ?? u._id;
  const menuLabel = (m: IdName) => m.name ?? m._id;

  const formDisabled = submitting || loadingLookup || !!lookupError;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Reviews</h1>
      </header>

      {/* Form tạo mới */}
      <form className="card" onSubmit={onCreate} style={{ marginBottom: 16 }}>
        {loadingLookup && <div className="notice">Loading users & menu…</div>}
        {lookupError && <div className="notice error">{lookupError}</div>}

        <div className="row">
          <select
            className="input"
            value={form.user}
            onChange={(e) => setForm({ ...form, user: e.target.value })}
            disabled={formDisabled}>
            <option value="">-- choose User --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {userLabel(u)}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
            disabled={formDisabled}>
            <option value="">-- choose Menu Item --</option>
            {menus.map((m) => (
              <option key={m._id} value={m._id}>
                {menuLabel(m)}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="number"
            min={1}
            max={5}
            placeholder="Rating 1..5"
            value={form.rating || ""}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
            disabled={formDisabled}
          />
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <textarea
            className="input"
            rows={2}
            placeholder="Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            disabled={formDisabled}
          />
          <button className="btn primary" type="submit" disabled={formDisabled}>
            {submitting ? "Creating…" : "Create"}
          </button>
        </div>
      </form>

      {loading && <div className="notice">Loading reviews…</div>}
      {error && <div className="notice error">{error}</div>}
      {!loading && !error && data.length === 0 && (
        <div className="notice">No reviews yet.</div>
      )}

      <ul className="list">
        {data.map((r) => (
          <li key={r._id} className="item">
            <div className="itemHead">
              <div>
                <div>
                  <strong>{getMenuItem(r.item)}</strong>
                </div>
                <div className="muted">by {getUserName(r.user)}</div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Stars value={r.rating} title={`Rating: ${r.rating}/5`} />
                <button className="btn danger" onClick={() => onDelete(r._id)}>
                  Delete
                </button>
              </div>
            </div>

            <p className="comment">{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
