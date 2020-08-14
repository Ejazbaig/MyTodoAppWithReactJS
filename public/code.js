// componentDidMount() {
///// random API data to display when loaded
//   fetch(API_URL)
//     .then((response) => response.json())
//     .then((value) => {
//       value = value.splice(0, 10);
//       let updatedItems = value.map((item) => {
//         return {
//           id: `${item.id}`,
//           item: item.title,
//           title: item.title,
//           done: false,
//           checked: false,
//           expand: false,
//         };
//       });
//       this.setState({
//         todoListDetails: updatedItems,
//       });
//     });
// }

/// to make the todoListDetails empty when something changes at first because of the default API data
// if (!prevState.loaded && prevState.todoItemId !== this.state.todoItemId) {
//   this.setState({
//     todoListDetails: [],
//     loaded: true,
//     checked: false,
//   });
// }
