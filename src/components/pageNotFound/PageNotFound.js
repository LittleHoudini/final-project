
//Incase the user enters invalid route a 404 error page will raise.
const PageNotFound = () => {
    return (
      <div>
        <h1 style={{color: "red", fontSize: 100 }}>404</h1>
        <h2>Page Not Found</h2>
      </div>
    );
  };

export default PageNotFound;