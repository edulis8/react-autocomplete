// fetchUsers custom hook
export default function useFetchUser(prefix) {
  async function fetchUsers(str) {
    return new Promise((res) => {
      setTimeout(
        () => {
          const sample = ['aaaaa', 'bbbbbbb', 'cccc', 'cccddd'];
          return res(sample.map((item) => prefix + item + str));
        },
        Math.ceil(Math.random() * 5) * 1000,
      );
    });
  }

  return {
    fetchUsers,
  };
}
