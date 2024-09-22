import { useRef, useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "flowbite";
import { useStateContext } from "../contexts/ContextProvider";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

export default function Retours() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();
    //modal
    const { user, setUser } = useStateContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenU, setIsOpenU] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const toggleUpdateModal = (d) => {
        setIsOpenU(!isOpenU);
        setbonUpdate(d);
    };

    const { bonId } = useParams();
    const [search_retour, setSearch_retour] = useState("");
    //const [dists, setDists] = useState([]);

    /*     const itemsPerPage = 10; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination boundaries
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const nextPage = () => {
        if (currentPage < Math.ceil(users.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }; */

    const [retours, setRetours] = useState([]);
    useEffect(() => {
        getRetours();
    }, []);

    const getRetours = () => {
        setLoading(true);
        if (bonId) {
            axiosClient
                .get(`/retourbybonid/${bonId}`)
                .then(({ data }) => {
                    setLoading(false);
                    setRetours(data.data);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .get("/retours")
                .then(({ data }) => {
                    setLoading(false);
                    setRetours(data.data);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const handleViewDetails = (id) => {
        if (user.role_id == 3) {
            const infoUpdate = {
                status: "B",
            };
            axiosClient
                .put(`/changestatus/${id}`, infoUpdate)
                .then(({ data }) => {
                    //setLoading(false);
                    console.log(data.data);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
        navigate(`/details/${id}`);
    };

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            My orders
                        </h2>

                        {/* <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <div>
                                <label
                                    htmlFor="order-type"
                                    className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select order type
                                </label>
                                <select
                                    id="order-type"
                                    className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                >
                                    <option selected>All orders</option>
                                    <option value="initiated">Initiated</option>
                                    <option value="in progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div> */}

                        {user.role_id == 1 && (
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
                            >
                                Add return request
                            </button>
                        )}
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <div className=" md:w-35">
                            <form class="max-w-xs mx-auto">
                                <div class="relative">
                                    <span class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        id="floating-phone-number"
                                        class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder="  Imei"
                                        onChange={(e) =>
                                            setSearch_retour(e.target.value)
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {retours
                                .filter((b) => {
                                    return search_retour.toLowerCase() === ""
                                        ? b
                                        : b.Imei.toLowerCase().includes(
                                              search_retour
                                          );
                                })
                                .map((b) => (
                                    <div
                                        className="flex flex-wrap items-center gap-y-4 py-6"
                                        key={b.id}
                                    >
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                                Product Imei:
                                            </dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                <a
                                                    href="#"
                                                    className="hover:underline"
                                                >
                                                    {b.Imei}
                                                </a>
                                            </dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                                Date:
                                            </dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                {b.date}
                                            </dd>
                                        </dl>

                                        {/* Timeline Section */}
                                        <div className="w-full sm:w-3/4 lg:w-auto flex items-center space-x-6">
                                            {/* First Status */}
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`h-4 w-4 rounded-full ${
                                                        b.status === "A"
                                                            ? "bg-sky-500"
                                                            : " bg-gray-600"
                                                    } dark:bg-primary-500`}
                                                ></div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                                                    Initiated
                                                </p>
                                            </div>

                                            {/* Connector Line */}
                                            <div className="h-px w-16 bg-gray-200 dark:bg-gray-700"></div>

                                            {/* Second Status */}
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`h-4 w-4 rounded-full ${
                                                        b.status === "B"
                                                            ? "bg-sky-500"
                                                            : " bg-gray-600"
                                                    } dark:bg-primary-500`}
                                                ></div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                                                    In Progress
                                                </p>
                                            </div>

                                            {/* Connector Line */}
                                            <div className="h-px w-16 bg-gray-200 dark:bg-gray-700"></div>

                                            {/* Third Status */}
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`h-4 w-4 rounded-full ${
                                                        b.status === "C"
                                                            ? "bg-sky-500"
                                                            : "bg-gray-600"
                                                    } dark:bg-primary-500`}
                                                ></div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                                                    Completed
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                            <a
                                                onClick={() =>
                                                    handleViewDetails(b.id)
                                                }
                                                href="#"
                                                className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                            >
                                                details
                                            </a>
                                        </div>
                                    </div>
                                ))}

                            <nav
                                className="mt-6 flex items-center justify-center sm:mt-8"
                                aria-label="Page navigation example"
                            >
                                <ul className="flex h-8 items-center -space-x-px text-sm">
                                    <li>
                                        <a
                                            href="#"
                                            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <span className="sr-only">
                                                Previous
                                            </span>
                                            <svg
                                                className="h-4 w-4 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m15 19-7-7 7-7"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            2
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            aria-current="page"
                                            className="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                        >
                                            3
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            ...
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            100
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <span className="sr-only">
                                                Next
                                            </span>
                                            <svg
                                                className="h-4 w-4 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m9 5 7 7-7 7"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
