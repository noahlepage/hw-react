import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Canvas from "../components/Canvas";

class Person {
  constructor(name, colour, img = null, to = {}) {
    this.name = name;
    this.to = to;
    this.point = { x: null, y: null };
    this.img = img;
    this.colour = colour;
  }

  addTo(person) {
    if (this.to[person.name]) {
      this.to[person.name] += 1;
    } else {
      this.to[person.name] = 1;
    }
  }

  isPair(person) {
    if (this.name == person.name) return false;
    return this.to[person.name] || person.to[this.name];
  }

  getTo() {
    return { ...this.to };
  }

  getFrom() {
    return { ...this.from };
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

  getColour() {
    return this.colour;
  }
}

function Home() {
  let john = new Person(
    "John",
    "red",
    "https://avatar.iran.liara.run/public/boy?username=John"
  );
  let jane = new Person(
    "Jane",
    "blue",
    "https://avatar.iran.liara.run/public/girl?username=Jane"
  );
  let tom = new Person(
    "Tom",
    "purple",
    "https://avatar.iran.liara.run/public/boy?username=Tom"
  );
  let bob = new Person(
    "Bob",
    "yellow",
    "https://avatar.iran.liara.run/public/boy?username=Bob"
  );
  let ash = new Person(
    "Ash",
    "orange",
    "https://avatar.iran.liara.run/public/boy?username=Ash"
  );
  // john.addTo(jane);
  const [data, setData] = useState({ people: [], pairs: [] });
  const [counter, setCounter] = useState(1);
  // const data = {
  //   people: [john, jane, bob],
  // };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const test = async () => {
      var people = [john];
      var pairs = [];
      var data = { people, pairs };
      setData(data);
      await sleep(1000);
      data = { ...data };
      data.people.push(jane);
      data.pairs.push([john, jane, 1]);
      setData(data);
      await sleep(2000);
      data = { ...data };
      data.people.push(bob);
      data.pairs.push([jane, bob, 1]);
      setData(data);
      await sleep(2000);
      data = { ...data };
      // people.push(bob);
      data.pairs.push([bob, john, 1]);
      setData(data);
      await sleep(2000);
      data = { ...data };
      data.pairs.push([john, jane, 2]);
      setData(data);
      await sleep(2000);
      data = { ...data };
      data.people.push(tom);
      data.pairs.push([jane, tom, 1]);
      setData(data);
      await sleep(2000);
    };
    test();
  }, []);

  const addPerson = () => {
    setCounter(counter + 1);

    if (data == null) {
      var people = [john];
      var pairs = [];
      var data = { people, pairs };
      setData(data);
    } else {
      var data = { ...data };
      console.log("else", data);
      data.people.push(tom);
      setData(data);
    }
  };

  // setTimeout(() => {
  //   if (!loop) return;
  //   var old = { ...data };
  //   old.people.push(tom);
  //   setData(old);
  //   setLoop(false);
  // }, 1000);

  return (
    <div>
      <Button onClick={addPerson}>New speaker {counter}</Button>
      <Canvas data={data} />
    </div>
  );
}

export default Home;
