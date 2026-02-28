import Link from "next/link";
import { Bookmark, CircleDashed, FolderOpen, Link2, PenLine } from "lucide-react";

const SideRail = () => {
  return (
    <aside className="side-rail" aria-label="Auxiliary actions" data-testid="side-rail">
      <div className="side-rail__stack">
        <button className="side-rail__icon" type="button" aria-label="Edit project metadata">
          <PenLine size={17} strokeWidth={1.8} />
        </button>
        <button className="side-rail__icon" type="button" aria-label="Inspect details">
          <CircleDashed size={17} strokeWidth={1.8} />
        </button>
        <button className="side-rail__icon" type="button" aria-label="Open files">
          <FolderOpen size={17} strokeWidth={1.8} />
        </button>
        <button className="side-rail__icon" type="button" aria-label="Saved items">
          <Bookmark size={17} strokeWidth={1.8} />
        </button>
      </div>
      <Link
        className="side-rail__pill"
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Open external profile"
      >
        <Link2 size={14} strokeWidth={1.8} />
      </Link>
    </aside>
  );
};

export default SideRail;
