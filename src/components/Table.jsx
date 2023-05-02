import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { apiData } = useContext(AppContext);

  return (
    <div className="divmaster">
      <table className="table">
        <thead className="head">
          <tr className="tr">
            <th className="th">Name</th>

            <th className="th">Rotation Period</th>

            <th className="th">Orbital Period</th>

            <th className="th">Diameter</th>

            <th className="th">Climate</th>

            <th className="th">Gravity</th>

            <th className="th">Terrain</th>

            <th className="th">Surface Water</th>

            <th className="th">Population</th>

            <th className="th">Films</th>

            <th className="th">Created</th>

            <th className="th">Edited</th>

            <th className="th">Url</th>
          </tr>
        </thead>
        <tbody>
          { apiData.map((dataElements) => (
            <tr
              className="rs"
              key={ dataElements.name }
            >
              <td>{ dataElements.name }</td>
              <td>{ dataElements.rotation_period }</td>
              <td>{ dataElements.orbital_period }</td>
              <td>{ dataElements.diameter }</td>
              <td>{ dataElements.climate }</td>
              <td>{ dataElements.gravity }</td>
              <td>{ dataElements.terrain }</td>
              <td>{ dataElements.surface_water }</td>
              <td>{ dataElements.population }</td>
              <td>{ dataElements.residents }</td>
              <td>{ dataElements.films }</td>
              <td>{ dataElements.created }</td>
              <td>{ dataElements.edited }</td>
              <td>{ dataElements.url }</td>
            </tr>
          ))}
          {/* {apiData.filter((e) => (e.name.includes(inputText))).map((e) => (
            <tr
              className="tr"
              key={ e.id }
            >
              <td className="td">{ e.name }</td>
              <td>{e.rotationPeriod}</td>
              <td>{e.orbitalPeriod}</td>
              <td>{e.diameter}</td>
              <td>{e.climate}</td>
              <td>
                {e.alternate_names.map((w, index) => <span key={ index }>{w}</span>)}

              </td>
              <td>{e.image}</td>
            </tr>))} */}
        </tbody>
      </table>
    </div>
  );
}
