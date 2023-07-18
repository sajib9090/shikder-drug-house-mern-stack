import { useEffect, useState } from "react";
import SingleChoice from "../SingleChoice/SingleChoice";

const Products = () => {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/sajib9090/shikder-drug-house-resources/main/Choice/Choice.json`
    )
      .then((res) => res.json())
      .then((data) => setChoices(data));
  }, []);
  //    console.log(choices);
  return (
    <div className="md:h-[630px] px-4 md:px-8">
      <div>
        <h1 className=" text-3xl font-extrabold py-10 dark:text-white">
          Customer's Choice
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {choices &&
          choices.map((choice, index) => (
            <SingleChoice key={index} choice={choice} />
          ))}
      </div>
    </div>
  );
};

export default Products;
