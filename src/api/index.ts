export interface IAddress {
  streetAddress: string,
  city: string,
  state:string,
  zip: string
}

export interface IUserInfo {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone:string,
  address: IAddress
  description: string
}

export type rowsType = 32 | 1000
export const usersAPI = {
  getUrl(rows: rowsType) {
    return `http://www.filltext.com/?rows=${rows}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
  },
  async getUsers(rows: rowsType): Promise<Array<IUserInfo> | void> {
    try {
      const url = this.getUrl(rows);
      const res: Response = await fetch(url);
      if (res.status === 200) return await res.json();
    } catch (e) {
      console.log(e)
    }
  },
};
