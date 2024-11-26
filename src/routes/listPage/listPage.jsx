import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense
            fallback={
              <img
                style={{
                  width: "200px",
                  display: "flex",
                  margin: "auto",
                }}
                src="/loading.gif"
                alt="loading"
              />
            }
          >
            <Await
              resolve={data?.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse?.data?.map((item) => (
                  <Card key={item.id} item={item} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense
          fallback={
            <img
              style={{
                width: "200px",
                display: "flex",
                margin: "auto",
              }}
              src="/loading.gif"
              alt="loading"
            />
          }
        >
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>

        {/* <Map items={data} /> */}
      </div>
    </div>
  );
}

export default ListPage;
