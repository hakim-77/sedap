export default function PageHeader({ title, breadcrumb, children }) {
    const renderBreadcrumb = () => {
      if (typeof breadcrumb === "string") {
        return <span className="text-gray-500">{breadcrumb}</span>;
      } else if (Array.isArray(breadcrumb)) {
        return breadcrumb.map((item, index) => (
          <span key={index} className="text-gray-500 flex items-center space-x-2">
            {index !== 0 && <span>/</span>}
            <span>{item}</span>
          </span>
        ));
      }
      return null;
    };
  
    return (
      <div id="pageheader-container" className="flex items-center justify-between p-4">
        <div id="pageheader-left" className="flex flex-col">
          <span id="page-title" className="text-3xl font-semibold">{title}</span>
          <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
            {renderBreadcrumb()}
          </div>
        </div>
        <div id="action-button">
          {children}
        </div>
      </div>
    );
  }
  