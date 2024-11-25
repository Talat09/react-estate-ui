import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <main className="homePage">
      <section className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p style={{ fontSize: "16px" }}>
            Discover your dream home with ease! Explore thousands of properties
            tailored to meet your needs.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h2>16+</h2>
              <p>Years of Experience</p>
            </div>
            <div className="box">
              <h2>200</h2>
              <p>Awards Gained</p>
            </div>
            <div className="box">
              <h2>2000+</h2>
              <p>Properties Ready</p>
            </div>
          </div>
        </div>
      </section>
      <figure className="imgContainer">
        <img
          src="https://i.ibb.co/61Fztdz/bg.png"
          srcSet="https://i.ibb.co/61Fztdz/bg-small.png 480w, https://i.ibb.co/61Fztdz/bg-large.png 1024w"
          sizes="(max-width: 600px) 480px, 1024px"
          alt="Luxury real estate background"
          width="1024"
          height="768"
          loading="lazy"
        />
      </figure>
    </main>
  );
}

export default HomePage;
