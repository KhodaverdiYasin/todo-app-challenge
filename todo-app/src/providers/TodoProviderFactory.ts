import { ApiProvider } from './ApiProvider';
import { ITodoProvider } from './ITodoProvider';
import { InMemoryProvider } from './InMemoryProvider';
import { LocalStorageProvider } from './LocalStorageProvider';

// Cache the InMemoryProvider instance to ensure todos persist between provider switches.
// This prevents the provider from resetting its state every time it is selected in the dropdown.
let inMemoryProvider: InMemoryProvider | null = null;

export function getTodoProvider(providerType: string): ITodoProvider {
    switch (providerType) {
        case 'api':
            return new ApiProvider();
        case 'local':
            return new LocalStorageProvider();
        case 'memory':
            if (!inMemoryProvider) {
                inMemoryProvider = new InMemoryProvider();
            }
            return inMemoryProvider;
        default:
            throw new Error('Invalid provider type');
    }
}
