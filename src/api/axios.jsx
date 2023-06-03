import axios from "axios";

const accessToken =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzZkMTA0YWI1NGIzZDFiODc5MDU2MTMyMDFlNGM2NyIsInN1YiI6IjY0M2ViODQ0ZTBjYTdmMDRiNTA3MzE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8GuQkQNRlUgX0zWzqF2RGwd2TFu683Pr_C0lX43fW4U";

const instance = axios.create({
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${accessToken}`,
	},
});

export default instance;
