import "./detail-author.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetAuthorDetail } from "../../../redux/reducer/authorSlice";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";

const AuthorDetail = () => {
  const dispatch = useDispatch();
  const { authorDetail, loading, error } = useSelector(
    (state) => state.authors || {}
  );

  // const authorDetail = {
  //   name: "Anne",
  //   lastName: " Rice",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQfIvaQBZiy6WcmSl-1dHmj4SOcDDhxkXbGBl3BEq0Hd1_hwkG-FLK6zurgOyx-gqcp1GPULaGtgQf_nLc",
  //   biography: [
  //     "Anne Rice (Nueva Orleans, Luisiana; 4 de octubre de 1941-Rancho Mirage, California; 11 de diciembre de 2021)1​ fue una escritora estadounidense autora de best-sellers de temática gótica y religiosa.",
  //     "Su obra más conocida es la serie literaria Crónicas vampíricas, cuya temática principal es el amor, la muerte, la inmortalidad, el existencialismo y las condiciones humanas. De sus libros se han vendido cerca de cien millones de ejemplares, convirtiéndola en una de las escritoras más leídas a nivel mundial.",
  //   ],
  //   books: [
  //     { bookName: "Interview with the Vampire", id: 1 },
  //     { bookName: "The Vampire Lestat", id: 2 },
  //     { bookName: "The Queen of the Damned", id: 3 },
  //     { bookName: "The Tale of the Body Thief", id: 4 },
  //     { bookName: "Memnoch The Devil", id: 5 },
  //     { bookName: "The Vampire Armand", id: 6 },
  //     { bookName: "Merrick", id: 7 },
  //     { bookName: "Blood and Gold", id: 8 },
  //     { bookName: "Blackwood Farm", id: 9 },
  //     { bookName: "Blood Canticle", id: 10 },
  //     { bookName: "Prince Lestat", id: 11 },
  //     { bookName: "Prince Lestat and the Realms of Atlantis", id: 12 },
  //     { bookName: "Blood Communion: A Tale of Prince Lestat", id: 13 },
  //     { bookName: "Pandora", id: 14 },
  //     { bookName: "Vittorio the Vampire", id: 15 },
  //     { bookName: "The Witching Hour", id: 16 },
  //     { bookName: "Lasher", id: 17 },
  //     { bookName: "Taltos", id: 18 },
  //     { bookName: "The Mummy, or Ramses the Damned", id: 19 },
  //     { bookName: "Ramses the Damned: The Passion of Cleopatra", id: 20 },
  //     { bookName: "Ramses the Damned: The Reign of Osiris", id: 21 },
  //     { bookName: "Christ the Lord: Outlook of Egypt", id: 22 },
  //     { bookName: "Christ the Lord: The Road to Cana", id: 23 },
  //     { bookName: "Angel Time", id: 24 },
  //     { bookName: "Of Love and Evil", id: 25 },
  //     { bookName: "The Wolf Gift", id: 26 },
  //     { bookName: "The Wolves of Midwinter", id: 27 },
  //     { bookName: "The Claiming of Sleeping Beauty", id: 28 },
  //     { bookName: "Beauty's Punishment", id: 29 },
  //     { bookName: "Beauty's Release", id: 30 },
  //     { bookName: "Beauty's Kingdom", id: 31 },
  //     { bookName: "The Feast of All Saints", id: 32 },
  //     { bookName: "Cry to Heaven", id: 33 },
  //     { bookName: "Servant of the Bones", id: 34 },
  //     { bookName: "Violin", id: 35 },
  //     { bookName: "Exit to Eden", id: 36 },
  //     { bookName: "Belinda", id: 37 },
  //   ],
  //   id: 1,
  // };

  useEffect(() => {
    return () => {
      dispatch(resetAuthorDetail());
    };
  }, [dispatch]);

  return error || !authorDetail ? (
    <NotFound message="author" />
  ) : loading && !authorDetail ? (
    <Loader />
  ) : (
    <div className="author-detail-container">
      <h1 className="author-name">
        {authorDetail.name} {authorDetail.lastName}
      </h1>

      <div className="author-detail-content">
        <div className="author-left">
          <img
            src={authorDetail.image}
            alt={authorDetail.name}
            className="author-photo"
          />
          <div className="author-bio">
            {authorDetail.biography.map((bio, index) => (
              <p key={index}>{bio}</p>
            ))}
          </div>
        </div>
        <div className="author-right">
          <div className="author-books-table-container">
            <table className="author-books-table">
              <tbody>
                {authorDetail.books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <NavLink
                        to={`/Book/Detail/${book.id}`}
                        className="book-title"
                      >
                        {book.bookName}
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
