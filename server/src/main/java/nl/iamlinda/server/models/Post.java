package nl.iamlinda.server.models;


import org.hibernate.annotations.Table;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String title;
    private String smiley;
    private String date;
    private String entry;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Post() {}

    public Post(int id, String title, String smiley, String date, String entry) {}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return id == post.id &&
                Objects.equals(title, post.title) &&
                Objects.equals(smiley, post.smiley) &&
                Objects.equals(date, post.date) &&
                Objects.equals(entry, post.entry) &&
                Objects.equals(user, post.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, smiley, date, entry, user);
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", smiley='" + smiley + '\'' +
                ", date='" + date + '\'' +
                ", entry='" + entry + '\'' +
                '}';
    }
}