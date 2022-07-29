import React from "react";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import Card from "./Card";
import { ItemTypes } from "./Constants";

const Column = ({
  passengers: { title, passengers },
  columnIndex,
  handleMoveMyPassenger,
  currentUserId,
}) => {
  const cards = passengers.map((passenger, index) => {
    const propsToDraggableCard = { passenger, columnIndex, index };
    console.log(passenger);
    return currentUserId !== passenger ? (
      <Card
        key={`${columnIndex} ${index} ${passenger}`}
        {...propsToDraggableCard}
      />
    ) : (
      <DraggableCard
        key={`${columnIndex} ${index} ${passenger}`}
        {...propsToDraggableCard}
      />
    );
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      const from = item;
      const to = { columnIndex };
      handleMoveMyPassenger(from, to);
    },
    canDrop: (item) => item.columnIndex !== columnIndex,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className="column"
    >
      <p className="column__title">{title}</p>
      <div className="column__cards">
        {cards}
        {isOver && canDrop ? <Card empty /> : ""}
      </div>
    </div>
  );
};

export default Column;
