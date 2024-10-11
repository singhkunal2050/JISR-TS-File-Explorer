// FileExplorer.tsx
import React, { useState } from "react";
import { Folder, File } from "lucide-react";

interface BaseFileData {
  type: "file" | "folder";
  name: string;
  meta?: string;
}

interface FileItem extends BaseFileData {
  type: "file";
}

interface FolderItem extends BaseFileData {
  type: "folder";
  data?: (FileItem | FolderItem)[];
}

type FileData = FileItem | FolderItem;

interface FileExplorerProps {
  data: FolderItem;
}

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: "copy" | "delete" | "rename") => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onAction,
}) => {
  return (
    <div
      className="fixed bg-white border rounded shadow-lg py-2 z-50"
      style={{ left: x, top: y }}
    >
      <button
        onClick={() => {
          onAction("copy");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Copy
      </button>
      <button
        onClick={() => {
          onAction("delete");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Delete
      </button>
      <button
        onClick={() => {
          onAction("rename");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Rename
      </button>
    </div>
  );
};

const FileExplorerItem: React.FC<{ item: FileData; level: number }> = ({
  item,
  level,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.type === "file") {
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const handleAction = (action: "copy" | "delete" | "rename") => {
    console.log(`${action} action on file: ${item.name}`);
  };

  const getFileIcon = () => {
    if (item.type === "folder") return <Folder className="text-yellow-500" />;

    switch (item.meta) {
      case "js":
        return <File className="text-yellow-400" />;
      case "ts":
        return <File className="text-blue-400" />;
      case "html":
        return <File className="text-orange-500" />;
      case "css":
        return <File className="text-blue-500" />;
      case "img":
      case "svg":
        return <File className="text-green-500" />;
      default:
        return <File className="text-gray-500" />;
    }
  };

  return (
    <div>
      <div
        className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${
          isSelected ? "bg-blue-100" : ""
        }`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => {
          if (item.type === "folder") {
            setIsExpanded(!isExpanded);
          } else {
            setIsSelected(!isSelected);
          }
        }}
        onContextMenu={handleContextMenu}
      >
        {getFileIcon()}
        <span className="ml-2">{item.name}</span>
      </div>

      {isExpanded && item.type === "folder" && item.data && (
        <div>
          {item.data.map((child, index) => (
            <FileExplorerItem
              key={`${child.name}-${index}`}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
};

const FileExplorer: React.FC<FileExplorerProps> = ({ data }) => {
  return (
    <div className="w-64 border rounded shadow">
      <div className="p-2 bg-gray-100 border-b font-semibold">
        File Explorer
      </div>
      <FileExplorerItem item={data} level={0} />
    </div>
  );
};

export default FileExplorer;
