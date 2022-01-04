import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'

import 'bootstrap/dist/css/bootstrap.min.css';

// import { useEffect, useCallback } from 'react';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import Box from '@material-ui/core/Box';
import Input from '@mui/material/Input';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { ngrokUrl } from '../../store/HostUrl';
import Select from 'react-select'
// import ReactTagInput from "@pathofdev/react-tag-input";
// import "@pathofdev/react-tag-input/build/index.css";

const ariaLabel = { 'aria-label': 'description' };



// const useSortableData = (items, config = null) => {
//   const [sortConfig, setSortConfig] = React.useState(config);

//   const sortedItems = React.useMemo(() => {
//     let sortableItems = [...items];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [items, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === 'ascending'
//     ) {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   return { items: sortedItems, requestSort, sortConfig };
// };



// const ProductTable = (props) => {
//   const { items, requestSort, sortConfig } = useSortableData(props.products);
//   const getClassNamesFor = (name) => {
//     if (!sortConfig) {
//       return;
//     }
//     return sortConfig.key === name ? sortConfig.direction : undefined;
//   };
//   return (
//     <table>
//       <caption>Products</caption>
//       <thead>
//         <tr>
//           <th>
//             <button
//               type="button"
//               onClick={() => requestSort('name')}
//               className={getClassNamesFor('name')}
//             >
//               Name
//             </button>
//           </th>
//           <th>
//             <button
//               type="button"
//               onClick={() => requestSort('price')}
//               className={getClassNamesFor('price')}
//             >
//               Price
//             </button>
//           </th>
//           <th>
//             <button
//               type="button"
//               onClick={() => requestSort('stock')}
//               className={getClassNamesFor('stock')}
//             >
//               In Stock
//             </button>
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {items.map((item) => (
//           <tr key={item.id}>
//             <td>{item.name}</td>
//             <td>${item.price}</td>
//             <td>{item.stock}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };



// export default function App() {
//   return (
//     <div className="App">
//       <ProductTable
//         products={[
//           { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
//           { id: 2, name: 'Milk', price: 1.9, stock: 32 },
//           { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
//           { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
//           { id: 5, name: 'Butter', price: 0.9, stock: 99 },
//           { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
//           { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
//         ]}
//       />
//     </div>
//   );
// }
































// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span style={{marginLeft:"13px"}}>
            Search:{' '}
            <input
            style={{width:"17%", marginLeft:"12px"}}
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        page,
        prepareRow,
        // state,
        preGlobalFilteredRows,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        state: { pageIndex, pageSize },

    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )

    return (
        <div style={{marginTop:"67px"}}>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table style={{marginTop:"19px"}} className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>

    )
}

function FilterTableComponent() {
  const [resyncing, setResyncing] = useState(false);
    const columns = React.useMemo(
        () => [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Type',
                        accessor: 'company_type'
                    },
                   {
                        Header: 'Url',
                        accessor: 'url'
                    },
                    {
                        Header: 'Foundation Year',
                        accessor: 'foundation_year'
                    },
                    {
                        Header: 'Posts',
                        accessor: 'posts'
                    },

                    {
                        filterable: false,
                        Header: 'Details',
                        accessor: 'link',
                        disableFilters:true,
                        Cell: ({ row }) =>
                        <Button variant='outlined'
                        style={{width:"146px"}}
                        type='submit' sx = {{mt:20}}
                        name= {row.original.id} onClick={ () => fetchCompanyDetail(row.original.id)}
                      > Fetch Details</Button>
                    },

                    {
                      filterable: false,
                      disableFilters:true,
                      Header: 'Sync',
                      accessor: 'link2',
                      Cell: ({ row }) =>
                      <Button variant='outlined'
                        type='submit' sx = {{mt:20}}
                        disabled = {resyncing? true:false}
                        name= {row.original.id}
                        // onClick={ () => resyncCompanyDetail(row.original.id)
                        onClick={ () => resyncDetail(row.original.id)
                      }
                      >
                        {/* {resyncing ? "Resyncing" : "Resync"} */}
                        Resync
                        </Button>
                  },
                  {
                    filterable: false,
                    disableFilters:true,
                    Header: 'Delete',
                    accessor: 'link3',
                    Cell: ({ row }) =>
                    <Button variant='outlined'
                    type='submit' sx = {{mt:20}}
                    name= {row.original.id} onClick={ () => destroyCompanyDetail(row.original.id)}
                  > Destroy</Button>
                },

                {
                  filterable: false,
                  Header: 'Progress',
                  accessor: 'resync_progress',
                  disableFilters:true,

                  Cell: s => (
                    <span style={{color:"red"}}  className={"RedColor"}>
                      {s.value}
                    </span>
                  ),

              },



        ],
        []
    )

    // const [isFetched, setIsFetched] = useState(false);
    const [url, setUrl] = useState('');
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = React.useState([])
    const [value, setValue] = useState(new Date());

    const destroyCompanyDetail = (id) => {
      const axios = require('axios').default;

      axios.delete(`${ngrokUrl}/api/v1/companies/${id}`, {
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        },
      }).then(function(response){
        if (response.data.success === true){
          setCount(count+1);
          toast.success("Delete Sucess",{
            position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
          // const axios = require('axios').default;
          axios.get(`${ngrokUrl}/api/v1/companies`, {
            headers:{
              'X-USER-TOKEN': localStorage.getItem('token'),
              "X-USER-EMAIL":localStorage.getItem('email')
            }
          }).then(function(response){
          if (response.data.success === true){
            setUserData(response.data.companies);
          }
          else{
          toast.error(response.data.message,  {
            position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
            }
          })
        }
        else{
      toast.error(response.data.message,  {
        position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
        }
      })
    }

    useEffect(() => {
      const axios = require('axios').default;
      axios.defaults.withCredentials=false
      axios.get(`${ngrokUrl}/api/v1/companies`, {
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        }
      }).then(function(response){
        if (response.data.success === true){
          setUserData(response.data.companies);
        }
        else{
      toast.error(response.data.message,  {
        position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
        }
      })
  },[count]);

  const [error, setError] = useState(false);

    const switchDetailModeHandler = (event) => {
      // let sent_url;
      event.preventDefault();
      if (value.getFullYear().toString().length < 4)
      {
        setError(true)
      }
      else
      {
        const axios = require('axios').default;
      axios.defaults.withCredentials=false

        setError(false)
          const headers = {
            'X-USER-TOKEN': localStorage.getItem('token'),
            "X-USER-EMAIL":localStorage.getItem('email')
          }

          const data = {
            name:name,
            company_type:type,
            url:url,
            foundation_year:value,
            // posts:posts.map(post=>post.value)
            posts:posts
            // posts:tags
          }

          axios.post(`${ngrokUrl}/api/v1/companies`,data, {
              headers: headers
            }).then(response => {
            // setIsLoading(false);
            console.log("String");
            console.log(response);
            if (response.data.success === false)
            {
              toast.error(response.data.message,  {
                position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            //   setFilterCall(false);
            //   // alert(response.data.message)
            }
            else{
              axios.get(`${ngrokUrl}/api/v1/companies`, {
                headers: headers
              }
              )
              .then(function(response){
                if (response.data.success === true){
                  setUserData(response.data.companies);
                }
              })

            // userData.push(response.data.company)
            // setIsFetched(true);
            // setFilterCall(false);
            // setIsFiltered(false);
            // setShowDetails(true);
          }
            // setError(false);
          }).catch(function (error) {
            console.log(error);
            toast.error("Something Went Wrong",  {
              position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
          })

        }
    };

    const history = useHistory();
    const fetchCompanyDetail =(id) =>{
      console.log(id)


      // const axios = require('axios').default;
      // axios.get(`https://www.linkedin.com/in/rachit-verma-31912813b/`, {
      // }).then(function(response){
      //   console.log(response)
      // })


      history.push(`/details/${id}`)
    }

    const handlePostChange = (event)=>{

      setPosts(event.target.value.split(","))
    }


    const resyncDetail = (id) =>{
      const axios = require('axios').default;



      axios.defaults.withCredentials=false
      axios.get(`${ngrokUrl}/api/v1/companies/${id}/resyncing?resync_progress=syncing in progress`, {
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        },
      }).then(function(response){
        setUserData(response.data.companies)
        resyncCompanyDetail(id)
      })

    }


    const resyncCompanyDetail = async (id) => {

      // setResyncing(true);

      // toast.success("Resync in progress",  {
      //   position: "top-right",
      //   autoClose: 40000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })

      const axios = require('axios').default;



      // axios.defaults.withCredentials=false
      // axios.get(`${ngrokUrl}/api/v1/companies/${id}/resyncing?resync_progress=syncing in progress`, {
      //   headers:{
      //     'X-USER-TOKEN': localStorage.getItem('token'),
      //     "X-USER-EMAIL":localStorage.getItem('email')
      //   },
      // }).then(function(response){
      //   setUserData(response.data.companies)
      // })



      console.log(`before 1st Resync = ${resyncing}`)



      await axios.get(`${ngrokUrl}/api/v1/resync?company_id=${id}`, {
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        },
      }).then(function(response){

        if (response.data.success === true){

          axios.get(`${ngrokUrl}/api/v1/companies/${id}/resyncing?resync_progress=Synced`, {
            headers:{
              'X-USER-TOKEN': localStorage.getItem('token'),
              "X-USER-EMAIL":localStorage.getItem('email')
            },
          }).then(function(response){

            setUserData(response.data.companies)
          })

          // axios.defaults.withCredentials=false
          // axios.get(`${ngrokUrl}/api/v1/companies/${id}/sync?resync_progress=ready for sync`).then(function(response){
          //   setUserData(response.data.companies)
          // })



          console.log(`after 1st Resync = ${resyncing}`)
          setResyncing(false);

          console.log(`After Resync Success = ${resyncing}`)
          toast.success("Resync Sucess",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          })
        }
        else{
          setResyncing(false);
          axios.get(`${ngrokUrl}/api/v1/companies/${id}/resyncing?resync_progress=Improper Synced`, {
            headers:{
              'X-USER-TOKEN': localStorage.getItem('token'),
              "X-USER-EMAIL":localStorage.getItem('email')
            },
          }).then(function(response){
            setUserData(response.data.companies)
          })
          console.log(`After Resync not success = ${resyncing}`)
          toast.error(response.data.message,  {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          }
        })
    }

    const options = [
      { value: 'Product Based', label: 'Product Based' },
      { value: 'Service Based', label: 'Service Based' },
      { value: 'other', label: 'Other' }
    ]

    const post_options = [
      { value: 'HUMAN RESOURCES', label: 'HR' },
      { value: 'CEO', label: 'CEO' },
      { value: 'COO', label: 'COO' },
      { value: 'FOUNDER', label: 'FOUNDER' }
    ]

    return (
      <section>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">

          <form alignItems="center" onSubmit={switchDetailModeHandler} >
            <div >
              <Input placeholder="Company Name *" inputProps={ariaLabel} onChange={e => setName(e.target.value)} required style={{width:"500px"}}  />
            </div>
            <div >
              <Input placeholder="Company Url *" inputProps={ariaLabel} required onChange={e => setUrl(e.target.value)}   style={{width:"500px", marginTop:"10px"}}  />
            </div>

            <div style = {{marginLeft:"-17px"}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box m={2} >
                <DatePicker
                  inputFormat="yyyy"
                  views={['year']}
                  label="Foundation Year"
                  minDate={new Date('1900-03-01')}
                  maxDate={new Date('2023-06-01')}
                  value={value}
                  onChange={setValue}
                  renderInput={(params) => <TextField style={{width:"500px"}} {...params} helperText={null} />}
                />
                {error && (<p>InValid Year</p>) }
              </Box>
            </LocalizationProvider>
          </div>

          <div style={{width:"500px", marginTop:"12px"}}>

              {/* <Input placeholder="Company Type" inputProps={ariaLabel} required onChange={e => setType(e.target.value)}  style={{width:"500px", marginTop:"10px"}}  /> */}


              {/* <Select placeholder = "Company Type" options={options}  required onChange={e => setType(e.target.value)} /> */}

              <Select placeholder = "Company Type" options={options}  required onChange={e => setType(e.value)} />

          </div>

          <div style={{width:"500px", marginTop:"12px"}}>
          {/* <Select placeholder = "Posts" isMulti options={post_options}  required onChange={handlePostChange} /> */}

          <Input placeholder="Posts *" required inputProps={ariaLabel} onChange={handlePostChange} required style={{width:"500px"}}  />


          </div>

          {/* <ReactTagInput required placeholder = "Posts Click enter to add *"
            tags={tags}
            onChange={(newTags) => setTags(newTags)}
          /> */}

              <Grid container spacing={2}>
                <Grid item>
                  <Box pt={2}>
                    <Button variant='outlined'
                        type='submit' sx = {{mt:20}} style = {{width:'217px', position:'absolute', left:'42%'}}
                        name="Fetch"
                      >
                        {/* {showDetails ? 'Hide Details' : 'Fetch Detais'} */}
                        Add
                      </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>

{< Table columns={columns} data={userData} />}
{/* {< ProductTable products = {userData} columns={columns} data={userData} />} */}
      </section>
    )
  }

export default FilterTableComponent;
