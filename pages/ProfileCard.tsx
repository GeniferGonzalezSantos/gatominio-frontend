"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profileCard.css";

interface UserData {
  id: string;
  nome: string;
  caracteristica: string;
}

export default function ProfileCard() {
  const [data, setData] = useState<UserData[] | null>(null); // Mudança aqui
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const apiUrlGetCat = process.env.NEXT_PUBLIC_API_GET_CAT;
    try {
      const response = await fetch(`${apiUrlGetCat}`);
      if (!response.ok) {
        throw new Error("Falha ao carregar os dados");
      }
      const userData: UserData[] = await response.json(); // Mudança aqui
      setData(userData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = (id: string) => {
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
        {data?.map((item: UserData, index: number) => ( // Mudança aqui
          <li key={index}>
            <div className="card">
              <img src="/gato.png" className="card-img-top" alt="..." />
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
