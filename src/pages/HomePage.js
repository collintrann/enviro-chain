function HomePage() {
  return <div>
    <header className="App-header">
    {/* File input hidden; triggered by button */}
    <input 
      type="file" 
      accept=".csv" 
      onChange={handleFileChange} 
      style={{ display: 'none' }} 
      id="fileInput" 
    />
    <button onClick={() => document.getElementById('fileInput').click()}>
      Upload Travel Expenses
    </button>
    <Link to="/view-profile">
      <button>My Profile</button>
    </Link>
</header>
  </div>
}

export default HomePage;