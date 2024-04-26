// fetchUsers function
export async function fetchUsers(str) {
  return new Promise((res) => {
    setTimeout(
      () => {
        const sample = ["aaaaa", "bbbbbbb", "cccc", "cccddd"];
        return res(sample.map((item) => item + str));
      },
      Math.ceil(Math.random() * 5) * 1000,
    );
  });
}
