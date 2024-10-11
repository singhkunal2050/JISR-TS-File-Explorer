// App.tsx
import FileExplorer from "./components/FileExplorer";
import "./styles.css";

const Files = {
  type: "folder" as const,
  name: "parent",
  data: [
    {
      type: "folder" as const,
      name: "root",
      data: [
        {
          type: "folder" as const,
          name: "src",
          data: [
            {
              type: "file" as const,
              meta: "js",
              name: "index.js",
            },
          ],
        },
        {
          type: "folder" as const,
          name: "public",
          data: [
            {
              type: "file" as const,
              meta: "ts",
              name: "index.ts",
            },
          ],
        },
        {
          type: "file" as const,
          meta: "html",
          name: "index.html",
        },
      ],
    },
  ],
};

export default function App() {
  return (
    <div className="App">
      <FileExplorer data={Files} />
    </div>
  );
}
