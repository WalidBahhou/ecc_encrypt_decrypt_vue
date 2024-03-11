export class eccService {
  private static _eccService: eccService;

  private constructor() {}

  public static getInstance(): eccService {
    if (!this._eccService) this._eccService = new eccService();
    return this._eccService;
  }

  public encrypt(message: string): Promise<any | any> {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/enc", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
        method: "POST",
      })
        .then((res) => {
          resolve(res.json());
        })
        .catch((error) => reject(error));
    });
  }

  public decrypt(message: any): Promise<any | any> {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/decr", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
        method: "POST",
      })
        .then((res) => {
          resolve(res.json());
        })
        .catch((error) => reject(error));
    });
  }

  public setkeys(): Promise<any | any> {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/keys", {
        method: "POST",
      })
        .then((res) => {
          resolve(res.json());
        })
        .catch((error) => reject(error));
    });
  }
}
