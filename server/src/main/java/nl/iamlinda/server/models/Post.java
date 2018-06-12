package nl.iamlinda.server.models;


import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String title;
    private String smiley;
    private String date;
    private String entry;
    private int userId;

    public Post() {}

    public Post(int id, String title, String smiley, String date, String entry, int userId) {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSmiley() {
        return smiley;
    }

    public void setSmiley(String smiley) {
        this.smiley = smiley;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getEntry() {
        return entry;
    }

    public void setEntry(String entry) {
        this.entry = entry;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", smiley='" + smiley + '\'' +
                ", date='" + date + '\'' +
                ", entry='" + entry + '\'' +
                ", userId=" + userId +
                '}';
    }
}