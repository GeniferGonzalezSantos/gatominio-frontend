import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profileCard.css";

export default function ProfileCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_GET_CAT);
      if (!response.ok) {
        throw new Error("Falha ao carregar os dados");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleProfileClick = (id) => {
    window.location.href = `/Profile_Id?id=${id}`;
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Espere um momento...</span>
        </div>
      </div>
    );
  if (error) return <div>Erro: {error}</div>;

  return (
    <section>
      <h1 className="title-profile-card">Os bichanos</h1>
      <ul className="list-profile-card">
        {data.map((item, index) => (
          <li key={index}>
            <div className="card">
              <img src="/gato.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.nome}</h5>
                <p className="card-text mt-3">{item.caracteristica}</p>
                <button
                  className="btn"
                  onClick={() => handleProfileClick(item.id)}
                >
                  Ver Perfil
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
