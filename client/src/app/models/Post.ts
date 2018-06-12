export class Post {
  id: number;
  title: string;
  smiley: string;
  date: string;
  entry: string;
  user_id: number;


  constructor(id: number, title: string, smiley: string, date: string, entry: string, user_id: number) {
    this.id = id;
    this.title = title;
    this.smiley = smiley;
    this.date = date;
    this.entry = entry;
    this.user_id = user_id;
  }
}
