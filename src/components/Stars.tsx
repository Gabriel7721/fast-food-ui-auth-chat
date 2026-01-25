type StarsProps = {
  value: number;
  max?: number;
  size?: number;
  title?: string;
};

export default function Stars({ value, max = 5, size = 18, title }: StarsProps) {
  const full = Math.max(0, Math.min(max, Math.round(value)));
  return (
    <span aria-label={title ?? `Rating ${full}/${max}`} title={title}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{ fontSize: size, lineHeight: 1 }}
          dangerouslySetInnerHTML={{
            __html: i < full ? "&starf;" : "&star;",
          }}></span>
      ))}
    </span>
  );
}
