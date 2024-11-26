import classes from "./ClassProfile.module.css";

const ClassProfile = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Class Profile</h1>

      <div className={classes.section}>
        <label className={classes.label}>Class Title</label>
        <input
          type="text"
          value="AP Macro Economics"
          className={classes.input}
        />
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Thumbnail photo</label>
        <div className={classes.thumbnail}>
          <img
            src="https://via.placeholder.com/400x200" // Replace with actual thumbnail URL
            alt="Class Thumbnail"
            className={classes.image}
          />
          <p className={classes.imageCaption}>blackwhite.jpg</p>
        </div>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Description</label>
        <textarea
          className={classes.textarea}
          defaultValue="Hello. I am Tyler. I teach science and math at Gogos. I would love to teach different students around the world."
        ></textarea>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Teaching Style</label>
        <textarea
          className={classes.textarea}
          defaultValue="Hello. I am Tyler. I teach science and math at Gogos. I would love to teach different students around the world."
        ></textarea>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Preferred Level</label>
        <div className={classes.buttons}>
          <button className={`${classes.button} ${classes.unselected}`}>
            No Proficiency
          </button>
          <button className={`${classes.button} ${classes.unselected}`}>
            Low Proficiency
          </button>
          <button className={`${classes.button} ${classes.selected}`}>
            Intermediate Proficiency
          </button>
          <button className={`${classes.button} ${classes.unselected}`}>
            Upper Intermediate Proficiency
          </button>
          <button className={`${classes.button} ${classes.unselected}`}>
            High Proficiency
          </button>
        </div>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Language</label>
        <div className={classes.inlineInput}>
          <input
            type="text"
            placeholder="Search Language"
            className={classes.input}
          />
          <button className={classes.addButton}>Add</button>
        </div>
      </div>

      <div className={classes.section}>
        <label className={classes.label}>Subject</label>
        <div className={classes.inlineInput}>
          <input
            type="text"
            placeholder="Add more subjects"
            className={classes.input}
          />
          <button className={classes.addButton}>Add</button>
        </div>
      </div>

      <button className={classes.saveButton}>Save all changes</button>
    </div>
  );
};

export default ClassProfile;
