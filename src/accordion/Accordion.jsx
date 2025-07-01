import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./styles.css";

function Accordion() {
  const items = [
    {
      title: "JavaScript Basics",
      content: "Learn variables, functions, and loops in JavaScript.",
    },
    {
      title: "React.js Overview",
      content: "Understand components, state, and props in React.",
    },
    {
      title: "Node.js",
      content: "Basics of server-side development with Node.js.",
    },
    {
      title: "Full-Stack Development",
      content: "Build full-stack apps with React and Node.js.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const accordionRef = useRef(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (items.length === 0 || !items) {
    return <p>No items available</p>;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target)
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={accordionRef} className="accordion">
      {items.map((item, index) => {
        return (
          <div key={index} className="accordion-item">
            <button
              className="accordion-title"
              aria-expanded={activeIndex === index}
              onClick={() => handleToggle(index)}
            >
              {item.title}
              {activeIndex === index ? (
                <FaChevronUp sytle={{ float: "right" }}></FaChevronUp>
              ) : (
                <FaChevronDown sytle={{ float: "right" }}></FaChevronDown>
              )}
            </button>
            {activeIndex === index && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
