export default class TasksService {
  static async fetchTasks() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await delay(1000);

    return [
      { id: 0, description: "task1", status: "Active" },
      { id: 1, description: "task2", status: "Active" },
    ];
  }
}
