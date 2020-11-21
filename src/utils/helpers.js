export const calculateRating = (data = []) => {
  let value = 0;
  if (data.length) {
    data.forEach((current) => {
      value += current.rating;
    });
    return (((value / data.length) * 10) / 10).toFixed(1);
  }
  return value;
};

export const paginate = (page, dataPerPage, data = []) => {
  const startIndex = (page - 1) * dataPerPage;
  const endIndex = page * dataPerPage;
  return data.slice(startIndex, endIndex);
};

export const calculateTotalPrice = (data = [], cartObj) => {
  let price = 0;
  data.forEach((item) => {
    price += item.pricePerServing * cartObj[item._id];
  });
  return ((price * 100) / 100).toFixed(2);
};

export const formatDate = (timestamp, fullMonth = false) => {
  let date;
  if (typeof timestamp === "number") {
    date = new Date(timestamp * 1000);
  } else {
    date = new Date(timestamp);
  }
  let dateString = date.toLocaleString("en-US", {
    day: "numeric",
    month: fullMonth ? "long" : "short",
    year: "numeric",
  });
  return dateString;
};

export const formatCost = (number) => {
  return `$ ${(number / 100).toFixed(2)}`;
};

export const limitCommentText = (body, limit = 150) => {
  const newBodyArray = [];
  if (body.length > limit) {
    body.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newBodyArray.push(cur);
      }
      return acc + cur.length;
    }, 0);

    const newBody = newBodyArray.join(" ");
    // return the result
    return [newBody, body.split(newBody)[1]];
  }
  return [body];
};
