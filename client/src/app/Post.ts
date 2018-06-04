export class Post {
  id: number;
  title: string;
  smiley: string;
  date: string;
  entry: string;


  constructor(id: number, title: string, smiley: string, date: string, entry: string) {
    this.id = id;
    this.title = title;
    this.smiley = smiley;
    this.date = date;
    this.entry = entry;
  }
}
