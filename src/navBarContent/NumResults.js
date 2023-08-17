function NumResults({ movies }) {
  // console.log(movies.length);
  return (
    <p className="num-results">
      Top <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
