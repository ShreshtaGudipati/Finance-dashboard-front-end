export default function Home() {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 className="accent-text">Welcome to Finance Dashboard</h1>
  
        <p style={{ marginTop: "10px" }}>
          Track your income, expenses, and insights in one place.
        </p>
  
        <div style={{ marginTop: "30px" }}>
          <img
            src="https://media.licdn.com/dms/image/v2/D5612AQGplp7JKG6Iiw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673950361361?e=2147483647&v=beta&t=L4d5P81GijVgU4u1yJtFLVsIqATkfWTrymEPSd_C6_o"
            alt="finance"
            style={{
              width: "100%",
              maxWidth: "800px",
              borderRadius: "16px",
            }}
          />
        </div>
      </div>
    );
  }