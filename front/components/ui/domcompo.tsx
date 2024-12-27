'use dom';

// you have to import it on all web view component
import '@/styles/app.css';

export default function DOMComponent({}: { dom: import('expo/dom').DOMProps }) {
  return (
    <div>
			<h1>Hello</h1>
			<p className="text-primary">okiiii</p>
		</div>
	);
}

