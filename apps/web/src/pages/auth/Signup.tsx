import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { useAuth } from '@/features/users/hooks/useAuth';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { signUpSchema } from '@/features/users/schema';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Signup = () => {
	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			mobile: '',
			password: '',
			confirmPassword: '',
		},
	});
	const [isLoading, setIsLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	// const { toast } = useToast();
	const navigate = useNavigate();
	const { register } = useAuth();

	const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
		setIsLoading(true);
		try {
			await register(data.name, data.email, data.password, data.mobile);
			toast('Account created!', {
				description: 'Your account has been successfully created.',
			});
			navigate('/login');
		} catch (error) {
			console.log(error);
			toast('Registration failed', {
				description:
					'There was an error creating your account. Please try again.',
				// variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const toggleShowPassword = () => setShowPassword(!showPassword);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-center text-2xl font-bold">
						<span className="text-vsphere-primary">Vendor</span>
						<span className="text-vsphere-dark">Sphere</span>
					</CardTitle>
					<CardDescription className="text-center">
						Create a new employee account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel htmlFor="name">FullName</FormLabel>
										<FormControl>
											<Input
												id="name"
												type="text"
												placeholder="John Doe"
												{...field}
												required
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel htmlFor="email">Email</FormLabel>
										<FormControl>
											<Input
												id="email"
												type="email"
												placeholder="john.doe@example.com"
												{...field}
												required
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="mobile"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel htmlFor="mobile">Mobile Number</FormLabel>
										<FormControl>
											<Input
												id="mobile"
												type="tel"
												placeholder="john.doe@example.com"
												{...field}
												required
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="space-y-2">
										{/* <FormLabel htmlFor="password">Email</FormLabel> */}
										<div className="relative">
											<FormControl>
												<Input
													id="password"
													type={showPassword ? 'text' : 'password'}
													placeholder="••••••••"
													{...field}
													required
												/>
											</FormControl>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute top-0 right-0"
												onClick={toggleShowPassword}
											>
												{showPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</Button>
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem className="space-y-2">
										{/* <FormLabel htmlFor="password">Email</FormLabel> */}
										<div className="relative">
											<FormControl>
												<Input
													id="confirmPassword"
													type={showPassword ? 'text' : 'password'}
													placeholder="••••••••"
													{...field}
													required
												/>
											</FormControl>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute top-0 right-0"
												onClick={toggleShowPassword}
											>
												{showPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</Button>
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<div className="relative">
									<UserCircle className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
									<Input
										id="name"
										type="text"
										placeholder="John Doe"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="pl-9"
										required
									/>
								</div>
							</div> */}
							{/* <div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="relative">
									<Mail className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
									<Input
										id="email"
										type="email"
										placeholder="john.doe@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-9"
										required
									/>
								</div>
							</div> */}
							{/* <div className="space-y-2">
								<Label htmlFor="mobile">Mobile Number</Label>
								<div className="relative">
									<Phone className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
									<Input
										id="mobile"
										type="tel"
										placeholder="+1 (555) 123-4567"
										value={mobile}
										onChange={(e) => setMobile(e.target.value)}
										className="pl-9"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute top-0 right-0"
										onClick={toggleShowPassword}
									>
										{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
									</Button>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="••••••••"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div> */}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<span className="flex items-center gap-2">
										Creating account...
									</span>
								) : (
									<span className="flex items-center gap-2">
										<UserPlus className="h-4 w-4" />
										Create Account
									</span>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<div className="text-center text-sm">
						Already have an account?{' '}
						<Link to="/login" className="text-vsphere-primary hover:underline">
							Login
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Signup;
