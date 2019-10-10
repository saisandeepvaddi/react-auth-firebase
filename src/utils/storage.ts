export const saveInStorage = (key: string, value: any) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const getFromStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
