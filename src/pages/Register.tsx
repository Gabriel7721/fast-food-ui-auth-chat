// import { type FormEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// export default function Register() {
//   const { register } = useAuth();
//   const nav = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function onSubmit(e: FormEvent) {
//     e.preventDefault();
//     setErr(null);
//     setLoading(true);
//     try {
//       await register(email.trim(), password);
//       nav("/");
//     } catch (e: any) {
//       setErr(e.message ?? "Register failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={onSubmit}>
//         <input placeholder="Email" type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input placeholder="Password" type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button disabled={loading} type="submit">
//           Create account
//         </button>
//       </form>

//       {err && <p>{err}</p>}
//     </div>
//   );
// }
