import React, { useEffect, useState, useRef } from "react";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";

export const Counter = () => {
  const refOne = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // event listeners

    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const [adultCounter, setAdultCounter] = useState(1);

  const handleAdultPlus = () => {
    setAdultCounter(adultCounter + 1);
  };

  const handleAdultMinus = () => {
    if (adultCounter !== 1) {
      setAdultCounter(adultCounter - 1);
    }
  };

  const [childrenCounter, setChildrenCounter] = useState(0);

  const handleChildPlus = () => {
    setChildrenCounter(childrenCounter + 1);
  };

  const handleChildMinus = () => {
    if (childrenCounter !== 0) {
      setChildrenCounter(childrenCounter - 1);
    }
  };

  const [infantCounter, setInfantCounter] = useState(0);

  const handleInfantPlus = () => {
    setInfantCounter(infantCounter + 1);
  };

  const handleInfantMinus = () => {
    if (infantCounter !== 0) {
      setInfantCounter(infantCounter - 1);
    }
  };

  const [petCounter, setPetCounter] = useState(0);

  const handlePetPlus = () => {
    setPetCounter(petCounter + 1);
  };

  const handlePetMinus = () => {
    if (petCounter !== 0) {
      setPetCounter(petCounter - 1);
    }
  };
  let numOfGuest = childrenCounter + infantCounter + adultCounter;

  const hideOnClickOutside = (event) => {
    if (refOne.current && !refOne.current.contains(event.target)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={refOne}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 20,
      }}
    >
      <div
        onClick={() => {
          setOpen((open) => !open);
        }}
        style={{
          textAlign: "center",
          border: "1px solid",
          borderRadius: 5,
          width: 200,
          height: 50,
          padding: 10,
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {petCounter === 0 && numOfGuest === 1
          ? `${numOfGuest} guest`
          : petCounter === 0 && numOfGuest > 1
          ? `${numOfGuest} guests`
          : petCounter === 1 && numOfGuest === 1
          ? `${numOfGuest} guest, ${petCounter} pet.`
          : petCounter > 1 && numOfGuest === 1
          ? `${numOfGuest} guest, ${petCounter} pets.`
          : petCounter > 1 && numOfGuest > 1
          ? `${numOfGuest} guests, ${petCounter} pets.`
          : `${numOfGuest} guests, ${petCounter} pet.`}
        <div
          style={{
            display: "flex",
          }}
        >
          {!open ? <IoIcons.IoIosArrowDown /> : <IoIcons.IoIosArrowUp />}
        </div>
      </div>

      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "space-around",
            alignItems: "flex-start",
            width: 300,
            position: "relative",
            // top: "20px",
            height: "302px",
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: " rgb(0 0 0 / 12%) 0px 6px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "stretch",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: 410,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span>
                <strong>Adults</strong>
              </span>
              <span>Age 13 +</span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <button onClick={handleAdultMinus}>
                <BiIcons.BiMinusCircle size={30} />
              </button>
              <span
                style={{
                  padding: 10,
                }}
              >
                {adultCounter}
              </span>
              <button onClick={handleAdultPlus}>
                <BsIcons.BsPlusCircle size={26} />
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "stretch",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: 410,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span>
                <strong>Children</strong>
              </span>
              <span>Ages 2-12</span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {childrenCounter === 0 ? (
                <button
                  disabled={"disabled"}
                  style={{ cursor: "not-allowed", opacity: 0.2 }}
                  onClick={handleChildMinus}
                >
                  <BiIcons.BiMinusCircle size={30} />
                </button>
              ) : (
                <button onClick={handleChildMinus}>
                  <BiIcons.BiMinusCircle size={30} />
                </button>
              )}
              <span
                style={{
                  padding: 10,
                }}
              >
                {childrenCounter}
              </span>
              <button onClick={handleChildPlus}>
                <BsIcons.BsPlusCircle size={26} />
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "stretch",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: 410,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span>
                <strong>Infants</strong>
              </span>
              <span>Under 2</span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {infantCounter === 0 ? (
                <button
                  disabled={"disabled"}
                  style={{ cursor: "not-allowed", opacity: 0.2 }}
                  onClick={handleInfantMinus}
                >
                  <BiIcons.BiMinusCircle size={30} />
                </button>
              ) : (
                <button onClick={handleInfantMinus}>
                  <BiIcons.BiMinusCircle size={30} />
                </button>
              )}
              <span
                style={{
                  padding: 10,
                }}
              >
                {infantCounter}
              </span>
              <button onClick={handleInfantPlus}>
                <BsIcons.BsPlusCircle size={26} />
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "stretch",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: 410,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span>
                <strong>Pets</strong>
              </span>
              <span
                style={{
                  fontSize: 10,
                  textDecorationLine: "underline",
                }}
              >
                Bringing a service animal?
              </span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {petCounter === 0 ? (
                <button
                  disabled={"disabled"}
                  style={{ cursor: "not-allowed", opacity: 0.2 }}
                  onClick={handlePetMinus}
                >
                  <BiIcons.BiMinusCircle size={30} />
                </button>
              ) : (
                <button onClick={handlePetMinus}>
                  <BiIcons.BiMinusCircle size={30} />
                </button>
              )}
              <span
                style={{
                  padding: 10,
                }}
              >
                {petCounter}
              </span>
              <button onClick={handlePetPlus}>
                <BsIcons.BsPlusCircle size={26} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
