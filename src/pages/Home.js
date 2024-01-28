import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Canvas from "../components/Canvas";

class Person {
  constructor(name, to = {}, img = null) {
    this.name = name;
    this.to = to;
    this.point = { x: null, y: null };
    this.img = img;
  }

  addTo(person) {
    if (this.to[person.name]) {
      this.to[person.name] += 1;
    } else {
      this.to[person.name] = 1;
    }
  }

  getTo() {
    return { ...this.to };
  }

  setPos(x, y) {
    this.point = { x, y };
  }

  getPoint() {
    return { ...this.point };
  }

  getImg() {
    return this.img;
  }
}

function Home() {
  let john = new Person("John", { Jane: 3 }, "../assets/img/img0.jpg");
  let jane = new Person("Jane");
  let tom = new Person("Tom");
  let bob = new Person("Bob");
  // john.addTo(jane);
  const [data, setData] = React.useState(null);
  const [loop, setLoop] = React.useState(true);
  // const data = {
  //   people: [john, jane, bob],
  // };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const test = async () => {
      var data = { people: [john] };
      setData(data);
      // await sleep(1000);
      data = { ...data };
      data.people.push(jane);
      setData(data);
      // await sleep(2000);
      // data.people[0].addTo(jane);
      data = { ...data };
      data.people.push(bob);
      setData(data);
      // await sleep(2000);
      data = { ...data };
      data.people.push(tom);
      setData(data);
    };

    test();
  }, []);

  // setTimeout(() => {
  //   if (!loop) return;
  //   var old = { ...data };
  //   old.people.push(tom);
  //   setData(old);
  //   setLoop(false);
  // }, 1000);

  return <Canvas data={data} />;
}

export default Home;
