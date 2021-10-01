let task = Promise.resolve();

export const scheduleCallBack = (cb: () => Promise<any>): Promise<any> => {
  task = task.then(cb);
  return task;
};

// eslint-disable-next-line no-unused-vars
export const then = (callBack: (arg: Promise<any>) => any) => callBack(task);
