// Just a file to keep the info for selectable full tram lines
const useSelectableTramLines = () => {
  const selectableTramLineInfo = [
    {
      id: '4546',
      routeName: 'Birmingham - Wolverhampton - Birmingham',
      serviceNumber: 'MM1',
    },
  ];

  const selectableTramLineIds = selectableTramLineInfo.map((line) => line.id);

  const filterTramLineInfo = (lineIds) => {
    if (!lineIds.length) return [];
    return selectableTramLineInfo.filter((line) => lineIds.indexOf(line.id) > -1);
  };

  return { selectableTramLineInfo, selectableTramLineIds, filterTramLineInfo };
};

export default useSelectableTramLines;
