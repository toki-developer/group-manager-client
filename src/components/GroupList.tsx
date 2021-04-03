const date = [
  {
    id: "1",
    name: "ハンド部",
    img: "",
  },
  {
    id: "2",
    name: "部活",
    img: "",
  },
];

export const GroupList = () => {
  return (
    <ul>
          {date.map((item) => {
              return (
                  <div key={item.id}>{ item.name }</div>
          )
      })}
    </ul>
  );
};
