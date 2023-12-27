import React, { useState } from "react";

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={handleToggle}>
        {node.label}
        {isOpen ? (!node.children ? "[-] " : "[+]") : ""}
      </div>
      {isOpen && node.children && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode key={child.label} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeList = () => {
  // 수정된 트리 데이터 구조
  const treeData = [
    {
      label: "모니터링",
      children: [
        {
          label: "모니터링",
        },
      ],
    },
    {
      label: "데이터조회",
      children: [
        {
          label: "모니터링",
          // children: [{ label: "Node 1.1" }, { label: "Node 1.2" }],
        },
        {
          label: "Node 2",
          children: [{ label: "Node 2.1" }, { label: "Node 2.2" }],
        },
      ],
    },
  ];

  return (
    <div>
      <h2>Tree List</h2>
      {treeData.map((node) => (
        <TreeNode key={node.label} node={node} />
      ))}
    </div>
  );
};

export default TreeList;
