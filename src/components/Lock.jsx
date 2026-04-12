import { OP, tx } from "../utils/design";

export default function Lock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={tx("var(--txt)", OP.bgStrong)} strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
