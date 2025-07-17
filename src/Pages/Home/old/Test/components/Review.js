import classes from "./Review.module.css";

const imageSource =
  "https://s3-alpha-sig.figma.com/img/aebb/1a73/6177f05e1ce4f1590cb0878bd15ff092?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HercrRna7HztCD9m7cx3JSWROeWXrjUkJx32DgJLpLgfNdR2hNnVAorbuOICQsXuZ4H0Gi1G5uyGcSKkjgxqD4p6kLG1Nt3kPks5D~hQhi4BXHWJ9s3M6pCJW8tuoGvM~5-XVRSltJedFGx-rPaX8exW5xCIU0naCdb~BzSOoSXg~kpGxk1NZCcm4D7prp25Sz32OdDMXIZuZNOouEH9YRGGTN1~mUgenZ02IThbCLYCRP30K~1vuj2rtM6R5c4aVb6DA78r6jrrN05~8RuDbY60lfqQ4x0-XKzTfvuRozlBvWq9uR-8yCoDgJ7TpJjz~lhP2hQVRxnFU7sLjKhldw__";
const finlay =
  "https://s3-alpha-sig.figma.com/img/aa07/44cb/ce0b6aa310d6190b9a7af24b2aae0985?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bf8ikkruaH2LpwyhwgvCpjaQe2rfsjjCTbxbx3efUCvyj3BSf0s~0lVW2y~vzi475pniou~Y8ldHGh-4V6v0qfqvjDwjI5Ha0tXG4DXRX3tZhuChpIOpc0SV5yngXMC6VJMcGWx-k1Y8BG3ga3TFvux~cUOvVywJmxvyW8BWfXdDmHQVs-Vby~swhJ~izW5GnhCBHh9IBUTOXVl60JSA0dYiD1pK6nth~empquoB5iTUF0ssyvZhA~puqdBB~Z21igVnEEky1h2aZR~dnFEA6rfHO-l2DSvSyq9HRTPQpw9mQDKh4bRsyCwAq1xFX2ohtiPI92X6lRmkTAWSZHd9vg__";

const Review = () => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <span className={classes.label}>Hear from students</span>
      </div>
      <div className={classes.content}>
        <div className={classes.textSection}>
          <h2 className={classes.quote}>
            “The easiest, yet the most{" "}
            <span className={classes.highlight}>
              professional online tutoring
            </span>{" "}
            to nail your academic goals”
          </h2>
          <a href="/" className={classes.learnMore}>
            Learn More &gt;
          </a>
        </div>
        <div className={classes.imageSection}>
          <img
            src={imageSource}
            alt="Student"
            className={classes.profileImage}
          />
        </div>
      </div>
      <div className={classes.testimonials}>
        <div className={classes.testimonialCard}>
          <p className={classes.testimonialText}>
            “Teachings of the great explorer of truth, the master-builder of
            human happiness.”
          </p>
          <div className={classes.testimonialAuthor}>
            <img
              src={finlay}
              alt="Finlay Kirk"
              className={classes.authorImage}
            />
            <div>
              <p className={classes.authorName}>Finlay Kirk</p>
              <p className={classes.authorDetails}>12th grade, Canada</p>
            </div>
          </div>
        </div>
        <div className={classes.testimonialCard}>
          <p className={classes.testimonialText}>
            “Teachings of the great explorer of truth, the master-builder of
            human happiness.”
          </p>
          <div className={classes.testimonialAuthor}>
            <img
              src={finlay}
              alt="Finlay Kirk"
              className={classes.authorImage}
            />
            <div>
              <p className={classes.authorName}>Finlay Kirk</p>
              <p className={classes.authorDetails}>12th grade, Canada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
