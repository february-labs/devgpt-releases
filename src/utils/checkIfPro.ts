//this function checks if the user is a pro user (has a pro plan)
import Stripe from "stripe";

import { supabase } from "@/utils/supabase";

const token = process?.env?.NEXT_PUBLIC_STRIPE_KEY
	? process?.env?.NEXT_PUBLIC_STRIPE_KEY
	: "";

const stripe = new Stripe(token, {
	apiVersion: "2023-08-16",
});

const checkIfPro = async (emailAddress: string) => {
	const errorHandler = (error: any) => {
		console.warn(error);
	};

	if (!emailAddress) {
		errorHandler("No email address provided");
		return false;
	}

	if (!supabase) {
		errorHandler(
			"Supabase is not configured correctly. Please check the .env file."
		);
		return false;
	}

	const found_customer = await stripe.customers.search({
		query: `email:'${emailAddress}'`,
	});

	const { id: stripe_customer_id } = found_customer.data[0];

	if (!stripe_customer_id) {
		errorHandler("No stripe_customer_id found for this user");
		return false;
	}

	const customer: any = await stripe.customers.retrieve(stripe_customer_id, {
		expand: ["subscriptions"],
	});

	if (!customer) {
		errorHandler("No customer found with this stripe_customer_id");
		return false;
	}

	if (
		customer?.subscriptions?.data?.[0]?.status === "active" ||
		customer?.subscriptions?.data?.[0]?.status === "trialing"
	) {
		return true;
	} else {
		return false;
	}
};

export { checkIfPro };
