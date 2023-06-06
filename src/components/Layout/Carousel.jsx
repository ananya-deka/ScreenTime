import classes from "./Carousel.module.css";
import Slider from "react-slick";
import nextArrow from "../../assets/icons8-next-50.png";
import prevArrow from "../../assets/icons8-back-50.png";

function NextArrow(props) {
	const { className, onClick } = props;
	return (
		<img
			src={nextArrow}
			className={`${className} ${classes.next_arrow}`}
			onClick={onClick}
		/>
	);
}

function PrevArrow(props) {
	const { className, onClick } = props;
	return (
		<img
			src={prevArrow}
			className={`${className} ${classes.next_arrow}`}
			style={{ display: `${onClick === null ? "none" : "block"}` }}
			onClick={onClick}
		/>
	);
}

const Carousel = (props) => {
	let settings = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<section className={classes.carousel}>
			<Slider {...settings}>{props.children}</Slider>
		</section>
	);
};

export default Carousel;
