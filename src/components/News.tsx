import React from "react";
import useApplicationData from "./hooks/useApplicationData"

interface Props {
  children :string
};

const News = ({ children } :Props) => {
  const { news } = useApplicationData();

  return (
    <>
      <div>{children}</div>
        {news.map((article :any, index :number) => {
          return (
            <div key={index}>
              {article.url && (
                  <>
                    <a href={article.url}>{article.title}</a>
                    <p>{article.created_at}</p>
                  </>
                )
              }
            </div>
          )
        })}
      <div>{children}</div>
    </>
  );
};

export default News;