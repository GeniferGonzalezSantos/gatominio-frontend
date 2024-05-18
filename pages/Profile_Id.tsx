"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile_id.css";

interface UserData {
  id: string;
  nome: string;
  idade: number;
  endereco: string;
  tutor: string;
  isCastrado: boolean;
  isFiv: boolean;
  isFelv: boolean;
  caracteristica: string;
  registroVeterinario: {
    dataConsulta: string;
    diagnostico: string;
    motivo: string;
    tratamento: string;
  }[];
}

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("meusPets");
  const [formData, setFormDataVet] = useState({
    diagnostico: "",
    motivo: "",
    tratamento: "",
    dataConsulta: "",
  });

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  const fetchData = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_ID_GATO;
    if (!router.query.id) return;
    try {
      const response = await fetch(`${apiUrl}/${router.query.id}`);
      if (!response.ok) {
        throw new Error("Falha ao carregar os dados");
      }
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_VET_REGISTER_CAT +
          "/" +
          `${router.query.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error("Erro ao criar usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro:", (error as Error).message);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    setFormDataVet({
      ...formData,
      [name]: value,
    });
  };

  const handleRemoveRegister = async (itemId: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_DELETE_REGISTER_CAT + "/" + itemId,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Falha ao remover o item");
      } else {
        router.back();
      }
      setUserData((prevData) => prevData && {
        ...prevData,
        registroVeterinario: prevData.registroVeterinario.filter((item) => item.dataConsulta !== itemId),
      });
    } catch (error) {
      console.error("Erro:", (error as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Espere um momento...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <section className="containerProfile">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "meusPets" ? "active" : ""}`}
            onClick={() => handleTabClick("meusPets")}
          >
            Meus Pets
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "consulta" ? "active" : ""}`}
            onClick={() => handleTabClick("consulta")}
          >
            Consulta
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "vet" ? "active" : ""}`}
            onClick={() => handleTabClick("vet")}
          >
            Ficha Veterinário
          </a>
        </li>
      </ul>
      {userData && (
        <>
          {activeTab === "meusPets" && (
            <div className="container">
              <div className="profile">
                <img src="/gato.png" alt="User Avatar" />
                <div className="profile-info">
                  <h2>{userData.nome}</h2>
                  <p>Idade: {userData.idade}</p>
                  <p>Endereco: {userData.endereco}</p>
                  <p>Tutor: {userData.tutor}</p>
                  <p>
                    Castrado: {userData.isCastrado === false ? "Não" : "Sim"}
                  </p>
                  <p>Fiv: {userData.isFiv === false ? "Não" : "Sim"}</p>
                  <p>Felv: {userData.isFelv === false ? "Não" : "Sim"}</p>
                </div>
              </div>
              <hr />
              <h3>Característica:</h3>
              <p>{userData.caracteristica}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveRegister(userData.id)}
              >
                Excluir Registro
              </button>
            </div>
          )}
          {activeTab === "consulta" && (
            <>
              <form className="formContainerConsulta" onSubmit={handleSubmit}>
                <div className="row m-1 p-1">
                  <h1>Registre a consulta do seu Pet</h1>

                  <div className="col-6 form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="diagnostico"
                      value={formData.diagnostico}
                      onChange={handleChange}
                      placeholder="Diagnostico"
                    />
                    <label htmlFor="floatingInput" className="ms-2">
                      Diagnostico
                    </label>
                  </div>

                  <div className="col-6 form-floating">
                    <textarea
                      className="form-control"
                      id="floatingAge"
                      name="motivo"
                      value={formData.motivo}
                      onChange={handleChange}
                      placeholder="Motivo"
                    />
                    <label htmlFor="floatingAge" className="ms-2">
                      Motivo
                    </label>
                  </div>

                  <div className="col-12 mt-3 form-floating">
                    <textarea
                      className="form-control"
                      id="floatingAddress"
                      name="tratamento"
                      value={formData.tratamento}
                      onChange={handleChange}
                      placeholder="Tratamento"
                    />
                    <label htmlFor="floatingAddress" className="ms-2">
                      Tratamento
                    </label>
                  </div>

                  <div className="col-12 mt-3 form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="floatingData"
                      name="dataConsulta"
                      value={formData.dataConsulta}
                      onChange={handleChange}
                      placeholder="Data"
                    />
                    <label htmlFor="floatingData" className="ms-2">
                      Data
                    </label>
                  </div>

                  <div className="col-md-12 mb-5 mt-4">
                    <button type="submit" className="btn">
                      Adicionar
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
          {activeTab === "vet" && (
            <div className="container">
              <h2>{userData.nome}</h2>
              {userData.registroVeterinario.map((vet: { dataConsulta: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; diagnostico: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; motivo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; tratamento: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <div className="profile" key={index}>
                  <div className="profile-info">
                    <p>Dia da consulta: {vet.dataConsulta} </p>
                    <p>Diagnóstico: {vet.diagnostico}</p>
                    <p>Motivo: {vet.motivo}</p>
                    <p>Tratamento: {vet.tratamento}</p>
                  </div>
                </div>
              ))}
              < hr />
            </div>
          )}
        </>
      )}
    </section>
  );
}
