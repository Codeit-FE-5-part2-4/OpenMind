import { useState } from "react";

function SortList() {
  const [view, setView] = useState(false);

  return (
    <ul>
      <li onClick={() => setView(!view)}>test</li>
      {view && (
        <li>
          <button>1</button>
          <br />
          <button>2</button>
        </li>
      )}
    </ul>
  );
}
export default SortList;
