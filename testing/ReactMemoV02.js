import { memo, useState } from "react";

export default function MyApp() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  return (
    <>
      <label>
        Name{": "}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Address{": "}
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      {/* <GreetingMemoV02 name={name} /> */}
      {/* <GreetingMemoV03 obj={{ name }} /> */}
      {/* <GreetingMemoV03False obj={{ name }} /> */}
      <GreetingMemoV03True obj={{ name }} />
      <GreetingMemoV04True obj={{ name, address }} />
      <GreetingMemoV05Cond obj={{ name, address }} />
      <GreetingMemoV06Cond obj={{ name, address }} />
    </>
  );
}

const GreetingV02 = ({ name }) => {
  console.log("222 | was rendered at", new Date().toLocaleTimeString());
  return <h3>V02:{name}</h3>;
};
const GreetingV03 = ({ obj }) => {
  console.log("333 | was rendered at", new Date().toLocaleTimeString());
  return <h3>V03:{obj.name}</h3>;
};

const GreetingV03F = ({ obj }) => {
  console.log("333 FFF | was rendered at", new Date().toLocaleTimeString());
  return <h3>V03F:{obj.name}</h3>;
};

const GreetingV03T = ({ obj }) => {
  console.log("333 TTT | was rendered at", new Date().toLocaleTimeString());
  return <h3>V03T:{obj.name}</h3>;
};
const GreetingV04T = ({ obj }) => {
  console.log("444 TTT | was rendered at", new Date().toLocaleTimeString());
  return (
    <h3>
      V04T:{obj.name}-{obj.address}
    </h3>
  );
};

const GreetingV05C = ({ obj }) => {
  console.log("555 CCC | was rendered at", new Date().toLocaleTimeString());
  return (
    <h3>
      V05C:{obj.name}-{obj.address}
    </h3>
  );
};
const GreetingV06C = ({ obj }) => {
  console.log("666 CCC | was rendered at", new Date().toLocaleTimeString());
  return (
    <h3>
      V06C:{obj.name}-{obj.address}
    </h3>
  );
};

const GreetingMemoV02 = memo(GreetingV02);
const GreetingMemoV03 = memo(GreetingV03);
const GreetingMemoV03False = memo(GreetingV03F, () => {
  return false;
});
const GreetingMemoV03True = memo(GreetingV03T, () => {
  return true;
});
const GreetingMemoV04True = memo(GreetingV04T, (p, n) => {
  return p.obj.name == n.obj.name;
});

const GreetingMemoV05Cond = memo(GreetingV05C, (p, n) => {
  return p.obj.name == n.obj.name;
});

const GreetingMemoV06Cond = memo(GreetingV06C, (p, n) => {
  console.log(p.obj.address, n.obj.address);
  return p.obj.address == n.obj.address;
});
